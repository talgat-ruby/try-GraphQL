import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } from 'graphql';
import fetch from 'node-fetch';

const GLOBAL_URL = `http://localhost:3000`;


const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: {
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		description: { type: GraphQLString }
	}
});

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		company: { 
			type: CompanyType,
			resolve({ companyId }, args) {
				return fetch(`${GLOBAL_URL}/companies/${companyId}`)
					.then(res => res.json());
			}
		}
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLInt } },
			resolve(parent, { id }) {
				return fetch(`${GLOBAL_URL}/users/${id}`)
					.then(res => res.json());
			}
		},
		company: {
			type: CompanyType,
			args: { name: { type: GraphQLString } },
			resolve(parent, { name }) {
				return fetch(`${GLOBAL_URL}/companies?name=${name}`)
					.then(res => res.json())
					.then(json => {
						console.log(json);
						return json;
					});
			}
		}
	}
});

export default new GraphQLSchema({
	query: RootQuery
});
