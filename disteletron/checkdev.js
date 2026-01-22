function Checkdev() {
    // check. if. it is sproduction or development 
    return process.env.NODE_ENV == "development";
}
export { Checkdev };
