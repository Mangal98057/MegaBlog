import conf from "../Conf/Conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const res = await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwirteCollectionId,
                queries
            )
            return res
        } catch (error) {
            console.log("getPosts error:", error)
            return { documents: [] } // ✅ no crash
        }
    }

    async createPost(data) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwirteCollectionId,
                data.slug || ID.unique(),
                data
            )
        } catch (error) {
            console.log("createPost error:", error)
            throw error
        }
    }

    async updatePost(slug, data) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwirteCollectionId,
                slug,
                data
            )
        } catch (error) {
            console.log("updatePost error:", error)
            return null
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwirteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("deletePost error:", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwirteCollectionId,
                slug
            )
        } catch (error) {
            console.log("getPost error:", error)
            return null
        }
    }

    async uploadFile(file) {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    }

    getFilePreview(fileId) {
        if (!fileId) return null
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

export default new Service()