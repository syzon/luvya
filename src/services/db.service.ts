import { Injectable } from '@angular/core';
import {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential,
    RemoteMongoDatabase,
    StitchAppClient
} from 'mongodb-stitch-browser-sdk';

@Injectable({ providedIn: 'root' })
export class DBService {
    db: RemoteMongoDatabase;
    client: StitchAppClient;

    initDB() {
        this.client = Stitch.initializeDefaultAppClient('ng-database-luvya-sqhjr');

        this.db = this.client
            .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
            .db('ng-db');
    }

    getUsers() {
        return this.client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(() => {
          return this.db
            .collection<{ name: string }>('users')
            .find()
            .asArray();
        });  
    }

    addUser(user: {name: string}) {
        this.client.auth.
        loginWithCredential(new AnonymousCredential()).
        then(() => {
            this.db.collection('users').insertOne(user);
        })
    }

    deleteUser(user: {name: string}) {
        this.client.auth.
        loginWithCredential(new AnonymousCredential()).
        then(() => {
            this.db.collection('users').deleteOne(user);
        })
    }



    // addUser(user: {name: string, dataOfBirth: Date, sex: boolean}) {
    //     this.client.auth.
    //     loginWithCredential(new AnonymousCredential()).
    //     then(() => {
    //         this.db.collection('users').insertOne(user);
    //     })
    // }
}


