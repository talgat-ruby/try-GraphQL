import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } from 'graphql';

const users = [
	{
		"_id": 1,
		"name": "Stephanie",
		"age": 41
	},
	{
		"_id": 2,
		"name": "Gamble",
		"age": 31
	},
	{
		"_id": 3,
		"name": "Lucy",
		"age": 22
	},
	{
		"_id": 4,
		"name": "Ophelia",
		"age": 34
	},
	{
		"_id": 5,
		"name": "Mckinney",
		"age": 24
	},
	{
		"_id": 6,
		"name": "Latonya",
		"age": 31
	},
	{
		"_id": 7,
		"name": "Estela",
		"age": 35
	}
]

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		age: { type: GraphQLInt }
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLInt } },
			resolve(parenValue, args) {
				return users.find(({ _id }) => _id === args.id);
			}
		}
	}
});

export default new GraphQLSchema({
	query: RootQuery
});
