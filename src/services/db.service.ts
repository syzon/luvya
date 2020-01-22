import { Injectable } from '@angular/core';
import {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential,
    RemoteMongoDatabase,
    StitchAppClient
} from 'mongodb-stitch-browser-sdk';
import { User } from 'src/models/user';
import { toUnicode } from 'punycode';
import { async } from '@angular/core/testing';

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

    findAccount(account) {
        return new Promise(resolve => {
            this.client.auth.
                loginWithCredential(new AnonymousCredential()).
                then(() => {
                    this.db.collection('users').findOne({ email: account.email })
                        .then(function (doc) {
                            resolve(doc);
                        });
                });

        })
    };


    getUser(user: User) {
        return new Promise(resolve => {
            this.client.auth.
                loginWithCredential(new AnonymousCredential()).
                then(() => {
                    this.db.collection('users').findOne({ email: user.email })
                        .then(function (doc) {
                            resolve(doc);
                        });
                });

        })
    };

    addUser(user: User) {
        this.client.auth.
            loginWithCredential(new AnonymousCredential()).
            then(() => {
                this.db.collection('users').insertOne(user);
            })
    }

    deleteUser(user: { name: string }) {
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


