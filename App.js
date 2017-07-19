import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import knex from './utils/try-knex'
import 'react-native-browser-builtins/react-native/process'
require('node-libs-react-native/globals');

export default class App extends React.Component {

  componentDidMount(){

    // Create a table
    knex.schema.createTable('users', function(table) {
      table.increments('id');
      table.string('user_name');
    })

    // ...and another
    .createTable('accounts', function(table) {
      table.increments('id');
      table.string('account_name');
      table.integer('user_id').unsigned().references('users.id');
    })

    // Then query the table...
    .then(function() {
      return knex.insert({user_name: 'Tim'}).into('users');
    })

    // ...and using the insert id, insert into the other table.
    .then(function(rows) {
      return knex.table('accounts').insert({account_name: 'knex', user_id: rows[0]});
    })

    // Query both of the rows.
    .then(function() {
      return knex('users')
        .join('accounts', 'users.id', 'accounts.user_id')
        .select('users.user_name as user', 'accounts.account_name as account');
    })

    // .map over the results
    .map(function(row) {
      console.log(row);
    })

    // Finally, add a .catch handler for the promise chain
    .catch(function(e) {
      console.error(e);
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
