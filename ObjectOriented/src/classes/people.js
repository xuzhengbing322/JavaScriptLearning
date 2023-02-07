class People {
    constructor (name, height, weight) {
        this.name = name;
        this.height = height;
        this.weight = weight;
    }

    // 成员方法
    intro () {
        console.log(`I am ${this.name}, ${this.height} tall.  And ${this.weight} kilos.`)
    }
    eat () {
        console.log(' I am eating')
    }
    sleep () {
        console.log(`I am sleeping`)
    }
    drink () {
        console.log(`I am drinking water`)
    }
}

export {
    People
}