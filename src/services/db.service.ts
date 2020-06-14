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
    loggedInUserId: String;
    loggedInUserEmail: String;
    account: any;

    // const ObjectID = require("mongodb").ObjectID;
    // type ObjectID= typeof import("mongodb").ObjectID;
    // const id: ObjectID = new ObjectID("5b681f5b61020f2d8ad4768d");

    initDB() {
        this.client = Stitch.initializeDefaultAppClient('ng-database-luvya-sqhjr');
        this.db = this.client
            .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
            .db('ng-db');
    }

    getUsers() {
        console.log("GETUSERS")
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

    findByKeyAndValueAccount(key, value) {

        this.client.auth.
            loginWithCredential(new AnonymousCredential()).
            then(() => {
                this.db.collection('users').find({ 'gender': 'female' })
                    .asArray()
                    .then(function (doc) {
                        console.log(doc)
                        for (let index = 0; index < doc.length; index++) {
                            const element = doc[index];

                            element['liked'].push('test@gmx.de');
                            console.log(element)
                        }
                        return doc;
                    });
            });
    };

    // findByKeyAndValueAccount(key, value) {
    //     return new Promise(resolve => {
    //         this.client.auth.
    //             loginWithCredential(new AnonymousCredential()).
    //             then(() => {
    //                 this.db.collection('users').find({ 'gender': 'female' })
    //                     .asArray()
    //                     .then(function (doc) {
    //                         console.log(doc)
    //                         resolve(doc);
    //                     });
    //             });

    //     })
    // };


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
        console.log(user)
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

    deleteAllUsers() {
        console.log("DELETE")
        this.client.auth.
            loginWithCredential(new AnonymousCredential()).
            then(() => {
                this.db.collection('users').deleteMany({});
            })
    }

    updateUserData(newDataObject) {
        console.log("UPDATE USERDATA")
        console.log(newDataObject)

        // const mergedObject = Object.assign(this.account, newValues)
        // console.log(JSON.stringify(mergedObject));
        // console.log(mergedObject)
        // delete mergedObject._id;
        const query = { "email": newDataObject.email };
        // const query = { "email": 'test@gmx.de' };

        this.client.auth.
            loginWithCredential(new AnonymousCredential()).
            then(() => {
                this.db.collection('users').updateOne(query, newDataObject);
            })
    }

    updateMany() {
        // console.log(newValues)

        // const mergedObject = Object.assign(this.account, newValues)
        // console.log(mergedObject)
        // delete mergedObject._id;
        const query = { "gender": 'female' };
        // const query = { "email": 'test@gmx.de' };

        // this.client.auth.
        //     loginWithCredential(new AnonymousCredential()).
        //     then(() => {
        //         this.db.collection('users').updateMany({ "gender": "female" }, { $set: { liked: ['test@gmx.de'] } });
        //     })
    }

    setAccount(foundAccount) {
        this.account = foundAccount;
    }

    getAccount() {
        return this.account;
    }

    getLoggedInAccount() {
        return this.account;
    }


    setLoggedInUserId(id: String) {
        this.loggedInUserId = id;
    }

    getLoggedInUserId() {
        return this.loggedInUserId;
    }

    setLoggedInUserEmail(email: String) {
        this.loggedInUserEmail = email;
    }

    getLoggedInUserEmail() {
        return this.loggedInUserEmail;
    }

    getLoggedInUser(userId) {
        console.log(userId)

        // const gameId = "5cb9404ffc6da85909eb561c";
        const query = { "_id": userId };

        console.log(query)

        return new Promise(resolve => {
            this.client.auth.
                loginWithCredential(new AnonymousCredential()).
                then(() => {
                    this.db.collection('users').findOne({ email: 'test@gmx.de' })
                        .then(function (doc) {
                            console.log("LOGGEDIN USER")
                            console.log(doc)
                            resolve(doc);
                        });
                });

        })
    }

    // getAccountViaEmail(userEmail) {

    //     this.client.auth.
    //         loginWithCredential(new AnonymousCredential()).
    //         then(() => {
    //             this.db.collection('users').findOne({ email: userEmail })
    //                 .then(function (doc) {
    //                     console.log(doc)
    //                     return doc;
    //                 });
    //         });
    // }

    getAccountViaEmail(userEmail) {
        return new Promise(resolve => {
            this.client.auth.
                loginWithCredential(new AnonymousCredential()).
                then(() => {
                    this.db.collection('users').findOne({ email: userEmail })
                        .then(function (doc) {
                            console.log(doc)
                            resolve(doc);
                        });
                });
        })
    }

    getRandomUsersByGender(amount: number, genderToFilter: String) {
        return new Promise(resolve => {
            this.client.auth.
                loginWithCredential(new AnonymousCredential()).
                then(() => {
                    if (genderToFilter === 'both') {
                        this.db.collection('users').aggregate(
                            [
                                { $sample: { size: amount } },
                                {
                                    $match: {
                                        $and: [
                                            { email: { '$nin': this.getAccount().liked } },
                                            { email: { '$nin': this.getAccount().disliked } }
                                        ]
                                    }
                                }
                            ]
                            // TODO: receive array and hold array of possible users locally
                        ).asArray().then(function (doc) {
                            resolve(doc)
                        }
                        )
                    } else {
                        this.db.collection('users').aggregate(
                            [
                                { $sample: { size: amount } },
                                {
                                    $match: {
                                        $and: [
                                            { gender: genderToFilter },
                                            { email: { '$nin': this.getAccount().liked } },
                                            { email: { '$nin': this.getAccount().disliked } }
                                        ]
                                    }
                                }

                            ]
                        ).asArray().then(function (doc) {
                            resolve(doc)
                        }
                        )
                    }
                });
        })
    }

    // postMatchAction(action: string) {
    //     console.log(newValues)

    //     const mergedObject = Object.assign(this.account, newValues)
    //     console.log(mergedObject)
    //     delete mergedObject._id;
    //     const query = { "email": this.account.email };
    //     // const query = { "email": 'test@gmx.de' };

    //     this.client.auth.
    //         loginWithCredential(new AnonymousCredential()).
    //         then(() => {
    //             this.db.collection('matchgame').updateOne(query, mergedObject);
    //         })
    // }

    // addUser(user: {name: string, dataOfBirth: Date, sex: boolean}) {
    //     this.client.auth.
    //     loginWithCredential(new AnonymousCredential()).
    //     then(() => {
    //         this.db.collection('users').insertOne(user);
    //     })
    // }
}


