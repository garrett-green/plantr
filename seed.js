const {db, Vegetable, Plot, Gardener} = require('./models');



db.sync({force: true})

  .then(() => {
    const veggiePromise = Vegetable.create({name: 'carrots', color: 'orange', planted_on: `${new Date()}`})

    const gardenerPromise = veggiePromise.then(vegetable => {
      return Gardener.create({name: 'dr green thumb', age: 33, vegetableId: vegetable.id})
    })

    .then(() => {
      db.close();
    })
  })
  .catch(err => {
    console.log('Distaster! Something went wrong!');
    console.log(err);
    db.close();
  })
