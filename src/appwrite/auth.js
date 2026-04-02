import conf from '../Conf/Conf'
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        const user = await this.account.create(
            ID.unique(),
            email,
            password,
            name
        )
        if (user) return this.login({ email, password })
        return user
    }

    async login({ email, password }) {
        return await this.account.createEmailPasswordSession(email, password)
    }

    // 🔥 FIXED
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            if (error.code === 401) return null
            console.log(error)
            return null
        }
    }

    async logout() {
        try {
            await this.account.deleteSession('current')
            return true
        } catch {
            return false
        }
    }
}

export default new AuthService()