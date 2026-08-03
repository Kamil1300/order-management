const check = async() => {
    const db = await process.env.DB_CON
    return db
}

const a = check()
console.log(a)