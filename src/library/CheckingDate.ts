import chalk from 'chalk';

export default class CheckingDateStatus {
    public static log = (args: any) => this.info(args);
    public static start = (args: any) =>
        console.log(
            chalk.green(`[${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}] [START CHECKINGDATE]`),
            typeof args === 'string' ? chalk.greenBright(args) : args
        );
    // If is the feature's passed
    public static info = (args: any) =>
        console.log(
            chalk.blue(`[${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}] [INFO CHECKINGDATE]`),
            typeof args === 'string' ? chalk.blueBright(args) : args
        );
    // If is we have some trouble it is in Yellow
    public static warn = (args: any) =>
        console.log(
            chalk.yellow(`[${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}] [WARN CHECKINGDATE]`),
            typeof args === 'string' ? chalk.yellowBright(args) : args
        );
    // If is not passed
    public static error = (args: any) =>
        console.log(
            chalk.red(`[${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}] [ERROR CHECKINGDATE]`),
            typeof args === 'string' ? chalk.redBright(args) : args
        );
}
