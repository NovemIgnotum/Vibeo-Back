import e, { NextFunction, Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import { createSession, getSession, deleteSession } from '../services/sessionService';
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');
const jwt = require('jsonwebtoken');
const SESSION_TTL = 60 * 60 * 24; // 1 jour

import User from '../models/User';
import Playlist from '../models/Playlist';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, firstname, password, pseudo } = req.body;
        if (!email || !name || !firstname || !password || !pseudo) {
            return res.status(400).json({ message: 'Missing parameters' });
        } else {
            if (await User.findOne({ pseudo })) {
                return res.status(400).json({ message: 'User already exist' });
            } else {
                if (await User.findOne({ email })) {
                    return res.status(400).json({ message: 'User already exist' });
                } else {
                    const salt: string = uid2(26);
                    const hash: string = SHA256(password + salt).toString(encBase64);

                    if (req.body.role) {
                        const role = req.body.role;
                        const user = new User({
                            account: {
                                name,
                                firstname
                            },
                            email,
                            pseudo,
                            role,
                            salt,
                            hash
                        });

                        return user
                            .save()
                            .then((user) => res.status(201).json({ user: user }))
                            .catch((error) => res.status(500).json({ error: error.message }));
                    } else {
                        const user = new User({
                            account: {
                                name,
                                firstname
                            },
                            email,
                            pseudo,
                            salt,
                            hash
                        });

                        return user
                            .save()
                            .then((user) => res.status(201).json({ user: user }))
                            .catch((error) => res.status(500).json({ error: error.message }));
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const readUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: 'No ID provided' });
        } else {
            const userFinded = await User.findById(userId);
            if (!userFinded) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                return res.status(200).json({ message: userFinded });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: 'No user found' });
        } else {
            return res.status(200).json({ message: users });
        }
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing parameters' });
        } else {
            console.log(email);
            const findedByIdUser = await User.findOne({ email });
            console.log(findedByIdUser);
            const findedUser = await User.findOne({ email: email });
            if (findedUser) {
                const verificatedHash = SHA256(password + findedUser.salt).toString(encBase64);
                if (verificatedHash === findedUser.hash) {
                    const sessionId = `session:${uid2(26)}`;
                    const userData = { findedUser, loggedInAt: new Date() };
                    await createSession(sessionId, userData, SESSION_TTL);
                    res.cookie('sessionId', sessionId, { httpOnly: true, secure: true, sameSite: 'none' });
                    return res.status(200).json({ message: 'Connected', id: findedUser.id, sessionId: sessionId });
                } else {
                    return res.status(400).json({ message: 'Wrong password' });
                }
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Missing parameters' });
    } else {
        const findedUser = await User.findOne({ email: email });
        if (findedUser) {
            findedUser.tokenVersion++;

            await findedUser.save();

            return res.status(200).json({ message: 'Disconnected' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.params.id);
        const { email, name, firstname, pseudo } = req.body;
        const userFinded = await User.findById(req.params.id);
        if (!userFinded) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            if (!name || !firstname || !email || !pseudo) {
                return res.status(400).json({ message: 'Missing parameters' });
            } else {
                userFinded.account.name = name;
                userFinded.account.firstname = firstname;
                userFinded.pseudo = pseudo;
                userFinded.email = email;
                if (req.body.password) {
                    const salt: string = uid2(26);
                    const hash: string = SHA256(req.body.password + salt).toString(encBase64);
                    userFinded.hash = hash;
                    userFinded.salt = salt;
                }
                if (req.files && Object(req).files.pic && Object(req).files.pic.length > 0) {
                    if (userFinded.profilePicture) {
                        const userRes = userFinded.profilePicture.split('/').pop();
                        cloudinary.uploader.destroy(userRes?.split('.')[0]);
                    }
                    const file = Object(req).files.pic[0];
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'profilePictures/',
                        use_filename: true,
                        unique_filename: true,
                        overwrite: true
                    });
                    userFinded.profilePicture = result.secure_url;
                }

                if (req.files && Object(req).files.background && Object(req).files.background.length > 0) {
                    if (userFinded.backgroundPicture) {
                        const userRes = userFinded.backgroundPicture.split('/').pop();
                        cloudinary.uploader.destroy(userRes?.split('.')[0]);
                    }
                    const file = Object(req).files.background[0];
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'backgroundPictures/',
                        use_filename: true,
                        unique_filename: true,
                        overwrite: true
                    });
                    userFinded.backgroundPicture = result.secure_url;
                }

                return userFinded
                    .save()
                    .then((user) => res.status(200).json({ user: user }))
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
        }
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'No ID provided' });
        } else {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                const userRes = user.profilePicture.split('/').pop();
                cloudinary.uploader.destroy(userRes?.split('.')[0]);

                await User.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: 'User deleted' });
            }
        }
    } catch (e) {
        return res.status(500).json({ error: Object(e).message });
    }
};

const addPlaylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            return res.status(404).json('Missing parameters');
        } else {
            const { playlist } = req.body;
            if (!playlist) {
                return res.status(404).json('One or many fields missing');
            } else {
                const playlistFinded = await Playlist.findById(playlist);
                const userFinded = await User.findById(req.params.id);
                if (!playlistFinded) {
                    return res.status(404).json('Playlist not found');
                }
                if (!userFinded) {
                    return res.status(404).json('User not found');
                }

                const alreadyAdded = userFinded.playlist.find((p) => p.toString() === playlist.toString());
                if (alreadyAdded) {
                    return res.status(400).json('You already added this playlist');
                } else {
                    userFinded.playlist.push(playlist);

                    await userFinded.save();

                    return res.status(200).json({ message: 'Playlist added to the user', userFinded });
                }
            }
        }
    } catch (e) {
        return res.status(500).json({ error: Object(e).message });
    }
};

const removePlaylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            return res.status(404).json('Missing parmaters');
        } else {
            const userFinded = await User.findById(req.params.id);
            if (!userFinded) {
                return res.status(404).json('User not found');
            }
            const { playlist } = req.body;
            const playlistFinded = await Playlist.findById(playlist);
            if (!playlistFinded) {
                return res.status(404).json('Playlist not found');
            }
            const isAdded = userFinded.playlist.find((p) => p.toString() === playlist.toString());
            if (isAdded) {
                userFinded.playlist = userFinded.playlist.filter((p) => p.toString() !== playlist.toString());
                await userFinded.save();
                return res.status(200).json({ message: 'Playlist remove from this user', userFinded });
            } else {
                return res.status(404).json('This user does not have this playlist');
            }
        }
    } catch (e) {
        return res.status(500).json({ message: 'Error catched', e });
    }
};

const addFollowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const findedUser = await User.findById(req.params.id);
        if (!findedUser) {
            return res.status(404).json('User not found');
        }
        const { following } = req.body;
        const findedFollowing = await User.findById(following);
        if (!findedFollowing) {
            return res.status(404).json('Following not found');
        }

        const alreadyFollowing = findedUser.following.find((f) => f.toString() === following.toString());
        if (alreadyFollowing) {
            return res.status(400).json('You already follow this user');
        } else {
            findedUser.following.push(following);
            findedFollowing.followers.push(findedUser._id);
            await findedUser.save();
            await findedFollowing.save();
            return res.status(200).json({ message: 'You follow this user', findedUser });
        }
    } catch (e) {
        return res.status(500).json({ message: 'Error catched', e });
    }
};

const removeFollowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const findedUser = await User.findById(req.params.id);
        if (!findedUser) {
            return res.status(404).json('User not found');
        }
        const { following } = req.body;
        const findedFollowing = await User.findById(following);
        if (!findedFollowing) {
            return res.status(404).json('Following not found');
        }

        const alreadyFollowing = findedUser.following.find((f) => f.toString() === following.toString());
        if (alreadyFollowing) {
            findedUser.following = findedUser.following.filter((f) => f.toString() !== following.toString());
            findedFollowing.followers = findedFollowing.followers.filter((f) => f.toString() !== findedUser._id.toString());
            await findedUser.save();
            await findedFollowing.save();
            return res.status(200).json({ message: 'You unfollow this user', findedUser });
        } else {
            return res.status(404).json('You do not follow this user');
        }
    } catch (e) {
        return res.status(500).json({ message: 'Error catched', e });
    }
};

const removeFollower = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const findedUser = await User.findById(req.params.id);
        if (!findedUser) {
            return res.status(404).json('User not found');
        }
        const { follower } = req.body;
        const findedFollower = await User.findById(follower);
        if (!findedFollower) {
            return res.status(404).json('Follower not found');
        }

        const alreadyFollower = findedUser.followers.find((f) => f.toString() === follower.toString());
        if (alreadyFollower) {
            findedUser.followers = findedUser.followers.filter((f) => f.toString() !== follower.toString());
            findedFollower.following = findedFollower.following.filter((f) => f.toString() !== findedUser._id.toString());
            await findedUser.save();
            await findedFollower.save();
            return res.status(200).json({ message: 'You remove this follower', findedUser });
        } else {
            return res.status(404).json('This user is not your follower');
        }
    } catch (e) {
        return res.status(500).json({ message: 'Error catched', e });
    }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('hmm cookies', req.cookies);
        const sessionId = req.cookies.sessionId;
        if (!sessionId) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            const session = await getSession(sessionId);
            if (!session) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                return res.status(200).json({ message: session.findedUser });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

export default {
    createUser,
    readUser,
    readAll,
    updateUser,
    deleteUser,
    login,
    logout,
    addPlaylist,
    removePlaylist,
    addFollowing,
    removeFollowing,
    removeFollower,
    getProfile
};
