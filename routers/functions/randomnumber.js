
process.on('message', (data) => {
    const { message, quantity } = data

    if (message == 'start') {
        const object = {}

        for (let i = 0; i < quantity; i++) {
            let aux = Math.floor(Math.random() * 1000 + 1)

            object[aux]
                ? object[aux] = object[aux] + 1
                : object[aux] = 1
        }

        process.send({object})
    }
})