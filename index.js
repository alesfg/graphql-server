import { ApolloServer, gql } from "apollo-server"

const persons = [
    {
        name: "Alex",
        phone: "645073052",
        street: "Calle Explorer",
        town: "Collado Villalba",
        id: "0395758b-0173-4cd0-92f5-1fedf9de2112"
    },
    {
        name: "Dani",
        phone: "645073054",
        street: "Calle Iglesia",
        town: "Becerril de la Sierra",
        id: "0395758b-0173-4cd0-92f5-1fedf9de2114"
    },
    {
        name: "Pablo",
        street: "Calle Iglesia",
        town: "Becerril de la Sierra",
        id: "0395758b-0173-4cd0-92f5-1fedf9de2113"
    }
]

const typeDefs = gql`
    type Person {
        name: String!
        phone: String
        street: String!
        town: String!
        id: ID!
    }
    
    type Query {
        personCount: Int!
        allPersons:[Person]!
        findPerson(name: String!): Person
    }`

    const resolvers = {
        Query: {
            personCount: () => persons.length,
            allPersons: () => persons,
            findPerson: (root, args) => {
                const {name} = args
                return persons.find(person => person.name === name)
            }
        }
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    server.listen().then(({url}) => {
        console.log(`Server ready at ${url}`)
    })