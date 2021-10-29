exports.index = async (req, res, next) => {
    res.send("Producers");
}

exports.add = async (req, res, next) => {
    res.send("Add Producers");
}

exports.update = async (req, res, next) => {
    res.send("Update Producers");
}

exports.find = async (req, res, next) => {
    res.send("Find Producers");
}

exports.remove = async (req, res, next) => {
    res.send("Remove Producers");
}