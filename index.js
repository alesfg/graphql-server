import { ApolloServer, gql } from "apollo-server"
import { v1 } from "uuid"

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
    type Address {
        street: String!
        town: String!
    }
    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }
    
    type Query {
        personCount: Int!
        allPersons:[Person]!
        findPerson(name: String!): Person
    }
    
    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            town: String!
        ): Person
    }
    `

    const resolvers = {
        Query: {
            personCount: () => persons.length,
            allPersons: () => persons,
            findPerson: (root, args) => {
                const {name} = args
                return persons.find(person => person.name === name)
            }
        },
        Mutation: {
            addPerson: (root,args) => {
                const person = {...args, id: uuid()}
                persons.push(person)
                return person
            }
        },
        Person: {
            address:(root) => {
                return {
                    street: root.street,
                    town: root.town
                }
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