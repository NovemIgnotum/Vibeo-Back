"use strict";
const crypt = require('crypto');
function crypting(dataToCrypt, cipherKey) {
    const cipher = crypt.createCipher('aes-256-cbc', cipherKey);
    let encrypted = cipher.update(dataToCrypt, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnVuY3Rpb25zL2NyeXB0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFaEMsU0FBUyxRQUFRLENBQUMsV0FBbUIsRUFBRSxTQUFpQjtJQUNwRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM1RCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUQsU0FBUyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQyJ9