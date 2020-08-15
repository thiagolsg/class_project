module.exports = async function(db, {proffyValue,classValue,classScheduleValues}){
    //inserir dados na tabela de proffys
   //o async é para poder usar o await
   //o await serve para quando precisamos de muitos "then" seguidos
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
   `)

    const proffy_id = insertedProffy.lastID

    //inserir dados na tabela classes

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"

            );
    `)

    const class_id = insertedClass.lastID

    //Inserir dados na tablea class_schedule

    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        //a função map ele pega o retorno da função e adiciona no array todas as vezes que a função for usada todos os retornos estarão dentro desse array
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                ${class_id},
                ${classScheduleValue.weekday},
                ${classScheduleValue.time_from},
                ${classScheduleValue.time_to}
            );
        
        `)
    }) 

    // aqui vou executar todos os db.runs() das class_schedules
        await Promise.all(insertedAllClassScheduleValues) //Promisse é uma função usada para um array de "várias promessas" vamos usa-lo para não executar todos os db.runs() de uma vez

}