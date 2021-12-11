class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            title: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            },
            firstname: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword });

        return this;
    }

    filter() {

        const queryCopy = { ...this.queryStr };

        const removeFields = ['keyword', 'limit', 'page'];

        removeFields.forEach(el => delete queryCopy[el]);

        // if (queryCopy.releaseDate.gte.trim() && queryCopy.releaseDate.lt.trim()) {
        //     queryCopy.releaseDate.gte = new Date(queryCopy.releaseDate.gte).toISOString();
        //     queryCopy.releaseDate.lt = new Date(queryCopy.releaseDate.lt).toISOString();
        // } 

        if (queryCopy.releaseDate) {
            if (queryCopy.releaseDate.gte.trim()) {
                queryCopy.releaseDate.gte = new Date(queryCopy.releaseDate.gte).toISOString();
            } else {
                delete queryCopy.releaseDate.gte;
            }

            if (queryCopy.releaseDate.lt.trim()) {
                queryCopy.releaseDate.lt = new Date(queryCopy.releaseDate.lt).toISOString();
            } else {
                delete queryCopy.releaseDate.lt;
            }

            if (!queryCopy.releaseDate.gte && !queryCopy.releaseDate.lt) {
                delete queryCopy.releaseDate;
            }
        }


        // queryCopy.releaseDate.gte.trim() ? queryCopy.releaseDate.gte = new Date(queryCopy.releaseDate.gte).toISOString(): null;
        // queryCopy.releaseDate.lt.trim() ? queryCopy.releaseDate.lt = new Date(queryCopy.releaseDate.lt).toISOString(): null;

        // queryCopy.releaseDate.gte = queryCopy.releaseDate ? new Date(queryCopy.releaseDate.gte).toISOString();
        // queryCopy.releaseDate.lt = queryCopy.releaseDate ? new Date(queryCopy.releaseDate.lt).toISOString();

        let queryStr = JSON.stringify(queryCopy);
        console.log(queryStr);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resPerPage) {

        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);

        return this;

    }
}

module.exports = APIFeatures;