exports.index = (req, res, next) => {
    res.send("Actors");
}

exports.add = (req, res, next) => {
    res.send("Add Actors");
}

exports.update = (req, res, next) => {
    res.send("Update Actors");
}

exports.find = (req, res, next) => {
    res.send("Find Actors");
}

exports.delete = (req, res, next) => {
    res.send("Delete Actors");
}