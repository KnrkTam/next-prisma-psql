const add = async (a,b) => {

    if (a < 0) throw new Error("Invalid");

    return a + b;
}

const sum = await add(3, 5)

sum 
console.log(sum)