const stories = [
    {
        name: 'Izabella',
        image: require('../assets/images/user_9.jpg'),
        read: true
    },
    {
        name: 'Thomasssruirtu',
        image: require('../assets/images/user_5.jpg'),
        read: false
    },
    {
        name: 'Virendra',
        image: require('../assets/images/user_6.jpg'),
        read: false
    },
    {
        name: 'jack',
        image: require('../assets/images/user_1.jpg'),
        read: true
    },
    {
        name: 'Jone',
        image: require('../assets/images/user_1.jpg'),
        read: true
    },
];
const events = [
    {
        event: 'Travel',
        place: require('../assets/images/event_1.jpg'),
        desc: 'Trip to Plam Shores Beaches fsfsfsfsdf fsdfsdsdfsdf dsdfsfsfsfsdf',
        date: '27-31 July',
        time: '11:00 UTC+2',
        image: require('../assets/images/user_9.jpg'),
        personName: 'Anje',
        price: '2000$'
    },
    {
        event: 'Science',
        place: require('../assets/images/event_2.jpg'),
        desc: 'Trip to Plam Shores Beaches',
        date: '31 July',
        time: '11:00 UTC+2',
        image: require('../assets/images/user_11.jpg'),
        personName: 'Leo',
        price: '3000$'
    },
    {
        event: 'Travel',
        place: require('../assets/images/event_3.jpg'),
        desc: 'Trip to Plam Shores Beaches',
        date: '27-31 July',
        time: '11:00 UTC+2',
        image: require('../assets/images/user_10.jpg'),
        personName: 'Anje',
        price: '2000$'
    },
    {
        event: 'Travel',
        place: require('../assets/images/event_9.jpg'),
        desc: 'Trip to Plam Shores Beaches',
        date: '27-31 July',
        time: '11:00 UTC+2',
        image: require('../assets/images/user_8.jpg'),
        personName: 'Anje',
        price: '2000$'
    },
    {
        event: 'Travel',
        place: require('../assets/images/event_5.jpg'),
        desc: 'Trip to Plam Shores Beaches',
        date: '27-31 July',
        time: '11:00 UTC+2',
        image: require('../assets/images/user_7.jpg'),
        personName: 'Anje',
        price: '2000$'
    },
];
const firebaseevents = [
    {
        category: 'Travel',
        place_images: ["https://firebasestorage.googleapis.com/v0/b/new-2oui.appspot.com/o/images%2F1556886860269.jpg?alt=media&token=2ee896e7-d1e9-42b2-abde-59e1a03f65c0"],
        event_title: 'Trip to Plam Shores Beaches',
        event_start_date: '27-31 July',
        time: '11:00 UTC+2',
        image: "https://firebasestorage.googleapis.com/v0/b/new-2oui.appspot.com/o/images%2F1556886860269.jpg?alt=media&token=2ee896e7-d1e9-42b2-abde-59e1a03f65c0",
        personName: 'Anje',
        event_creater: {
            name: "test",
            image: "https://firebasestorage.googleapis.com/v0/b/new-2oui.appspot.com/o/images%2F1556886860269.jpg?alt=media&token=2ee896e7-d1e9-42b2-abde-59e1a03f65c0"
        },
        budget: {
            currency: '€',
            value: '2000'
        },
        rating: "4.3",
        view: "cinema studio"

    }
];
const peoples = [
    {
        name: 'Izabella',
        age: 22,
        prof: 'Veterinarian',
        dist: '40km',
        image: require('../assets/images/user_9.jpg'),
    },
    {
        name: 'Adaora',
        age: 21,
        prof: 'Archeologist',
        dist: '61km',
        image: require('../assets/images/user_8.jpg'),
    },
    {
        name: 'Virendra',
        age: 22,
        prof: 'Florist',
        dist: '25km',
        image: require('../assets/images/user_6.jpg'),
    },
    {
        name: 'jack',
        age: 25,
        prof: 'Veterinarian',
        dist: '40km',
        image: require('../assets/images/user_1.jpg'),
    },
];
const relatedEvents = [
    {
        image: require('../assets/images/event_4.jpg'),
        category: 'Restaurant',
        title: 'Epicurean brunch in the hear of Paris',
        titleColor: 'rgb(255,146,121)',
        date: '12 April',
        time: '18:00 UTC+2',
        eventManager: {
            name: 'Aasiya',
            image: require('../assets/images/user_10.jpg')
        },
        price: '350$'
    },
    {
        image: require('../assets/images/event_5.jpg'),
        category: 'Sport',
        title: 'Friendly golf tournament',
        titleColor: 'rgb(239,113,184)',
        date: '27 - 31 July',
        time: '11:00 UTC+2',
        eventManager: {
            name: 'Thomasson',
            image: require('../assets/images/user_5.jpg')
        },
        price: '80$'
    },
    {
        image: require('../assets/images/event_6.jpg'),
        category: 'Art',
        title: 'Art Club: Introduction to Painting',
        titleColor: 'rgb(239,113,184)',
        date: '4 May',
        time: '14:00 UTC+2',
        eventManager: {
            name: 'Izabella',
            image: require('../assets/images/user_9.jpg')
        },
        price: '150$'
    },
    {
        image: require('../assets/images/event_7.jpg'),
        category: 'Health',
        title: 'Spa Day for mums, sisters, daughters &...',
        titleColor: 'rgb(108,171,247)',
        date: '20 June',
        time: '10:00 UTC+2',
        eventManager: {
            name: 'Alicia',
            image: require('../assets/images/user_3.jpg')
        },
        price: '400$'
    }
];
const yours = [
    {
        image: require('../assets/images/event_3.jpg'),
        category: 'Movies',
        title: 'Harry Potter Marathon at the cinema',
        titleColor: 'rgb(108,171,247)',
        date: '9 - 10 Sep',
        time: '20:00 UTC+2',
        eventManager: {
            name: 'Jack',
            image: require('../assets/images/user_1.jpg')
        },
        price: '120$'
    },
];
const upcoming = [
    {
        image: require('../assets/images/event_4.jpg'),
        category: 'Restaurant',
        title: 'Epicurean brunch in the heart of Paris',
        titleColor: 'rgb(255,146,121)',
        date: '12 April',
        time: '18:00 UTC+2',
        eventManager: {
            name: 'Aasiya',
            image: require('../assets/images/user_10.jpg')
        },
        price: '350$'
    },
    {
        image: require('../assets/images/event_5.jpg'),
        category: 'SPORT',
        title: 'Friendly golf tournament',
        titleColor: 'rgb(239,113,184)',
        date: '27 - 31 July',
        time: '11:00 UTC+2',
        eventManager: {
            name: 'Thomasson',
            image: require('../assets/images/user_5.jpg')
        },
        price: '80$'
    },
    {
        image: require('../assets/images/event_7.jpg'),
        category: 'Health',
        title: 'Spa Day for mums, sisters, daughters & all ladies',
        titleColor: 'rgb(108,171,247)',
        date: '20 June',
        time: '10:00 UTC+2',
        eventManager: {
            name: 'Alicia',
            image: require('../assets/images/user_3.jpg')
        },
        price: '400$'
    },
];
const past = [
    {
        image: require('../assets/images/event_1.jpg'),
        category: 'TRAVEL',
        title: 'Trip to Palm Shores Beaches',
        titleColor: 'rgb(108,171,247)',
        date: '27 - 31 July',
        time: '11:00 UTC+2',
        eventManager: {
            name: 'Anje',
            image: require('../assets/images/user_10.jpg')
        },
        price: '2000$'
    },
    {
        image: require('../assets/images/event_6.jpg'),
        category: 'ART',
        title: 'Art Club: Introduction to Painting',
        titleColor: 'rgb(239,113,184)',
        date: '4 May',
        time: '14:00 UTC+2',
        eventManager: {
            name: 'Izabella',
            image: require('../assets/images/user_9.jpg')
        },
        price: '150$'
    },
];
const categories = [
    {
        title: 'Food',
        data: [
            {
                name: 'Restaurants',
                image: require('../assets/images/restaurant.png'),
                checked: true,
                value: 'restaurant'
            },
            {
                name: 'Atm',
                image: require('../assets/images/glass.png'),
                checked: false,
                value: 'atm'

            },
            {
                name: 'Cafes',
                image: require('../assets/images/cafe.png'),
                checked: false,
                value: 'cafe'
            },
        ]
    },
    {
        title: 'Hobbies',
        data: [
            {
                name: 'Night life',
                image: require('../assets/images/night_life.png'),
                checked: false,
                value: 'night life'
            },
            {
                name: 'Attractions',
                image: require('../assets/images/attraction.png'),
                checked: false,
                value: 'attraction'

            },
            {
                name: 'Movies',
                image: require('../assets/images/movie.png'),
                checked: true,
                value: 'multiplex'
            },
            {
                name: 'Art',
                image: require('../assets/images/art.png'),
                checked: true,
                value: 'art'
            },
            {
                name: 'Science',
                image: require('../assets/images/science.png'),
                checked: false,
                value: 'science'
            },
            {
                name: 'Sport',
                image: require('../assets/images/sport.png'),
                checked: false,
                value: 'sport'
            },
        ]
    },
    {
        title: 'Others',
        data: [
            {
                name: 'Travel',
                image: require('../assets/images/travel.png'),
                checked: true,
                value: 'travel'
            },
            {
                name: 'Health',
                image: require('../assets/images/health.png'),
                checked: false,
                value: 'health'
            },
            {
                name: 'Shopping',
                image: require('../assets/images/shopping.png'),
                checked: false,
                value: 'shopping'
            },
        ]
    },

];
const category = [

    {
        name: 'Restaurants',
        image: require('../assets/images/restaurant.png'),
        checked: true,
        value: 'restaurant'
    },
    {
        name: 'Bars',
        image: require('../assets/images/glass.png'),
        checked: false,
        value: 'bat'

    },
    {
        name: 'Cafes',
        image: require('../assets/images/cafe.png'),
        checked: false,
        value: 'cafe'
    }, {
        name: 'Night life',
        image: require('../assets/images/night_life.png'),
        checked: false,
        value: 'night life'
    },
    {
        name: 'Attractions',
        image: require('../assets/images/attraction.png'),
        checked: false,
        value: 'attraction'

    },
    {
        name: 'Movies',
        image: require('../assets/images/movie.png'),
        checked: true,
        value: 'multiplex'
    },
    {
        name: 'Art',
        image: require('../assets/images/art.png'),
        checked: true,
        value: 'art'
    },
    {
        name: 'Science',
        image: require('../assets/images/science.png'),
        checked: false,
        value: 'science'
    },
    {
        name: 'Sport',
        image: require('../assets/images/sport.png'),
        checked: false,
        value: 'sport'
    },
    {
        name: 'Travel',
        image: require('../assets/images/travel.png'),
        checked: true,
        value: 'travel'
    },
    {
        name: 'Health',
        image: require('../assets/images/health.png'),
        checked: false,
        value: 'health'
    },
    {
        name: 'Shopping',
        image: require('../assets/images/shopping.png'),
        checked: false,
        value: 'shopping'
    },


];

export default {
    stories,
    events,
    peoples,
    relatedEvents,
    yours,
    upcoming,
    past,
    firebaseevents,
    categories,
    category,
};
