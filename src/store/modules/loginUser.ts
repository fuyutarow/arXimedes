import Vue from 'vue';
import {Module, VuexModule, Mutation, Action, MutationAction} from 'vuex-module-decorators';


import firebase from 'firebase';

const authFirebase = async () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    const google = new firebase.auth.GoogleAuthProvider();
    return await firebase
        .auth()
        .signInWithPopup(google)
        .then((result: any) => {
            // token = result.credential.accessToken;
            // user = result.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
        });
};


@Module({namespaced: true})
export default class LoginUser extends VuexModule {
    public detail: any = {};
    public token: string = '';

    @Mutation public init() {
        this.detail = {};
        this.token = '';
    }

    @MutationAction({mutate: ['detail', 'token']})
    public async signin() {
        await authFirebase();
        const detail: any = await firebase.auth().currentUser;
        const token: string = await firebase.auth().currentUser!.getIdToken(true);
        return {detail, token};
    }

    @Action({commit: 'init'})
    public async signout() {
        await firebase.auth().signOut();
        return;
    }
}
