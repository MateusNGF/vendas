
### REQUIRED
- Node 16.10.0
- Docker

### REMARKS
- The injection script in mongodb doesn't work, i.e. I don't have any indexes created.
- Use the autocannon to perform the load test..
- To change your user to adm, follow these steps:

    ```
    docker exec -it mongo_db sh
    use vendas
    db.authenticates.update({ associeted_user : <YOUR_ID>}, { access_level  : 1 })`
    ```

---

# USING DOCKER (production)
> How to run project using docker ? In root director, run ```npm run docker-deploy```.
> That command build the project to js and image to docker, then trigger the command to compose all depency from project, run ```start:docker```.
>
> >  ☑️ LoadBalance:Nginx
> >  ☑️ MemoryCache:Reddis
> >  ☑️ DiskMemory:Mongo
> > 

> Finally, Access endpoint using : http://localhost:8080, with port 8080.


# USING DEVELOPER
 > For using project how to developer, need compose depency of project using docker: MongoDB, disk in database, only. And Reddis optional. 
 > Then, run command ```rpm run start:dev```.
> 
> >  ◻️ LoadBalance:Nginx
> >  ❓ MemoryCache:Reddis
> >  ☑️ DiskMemory:Mongo

 > Finaly, access endpoint using http://localhost:3000, with port 3000.

---

### BASIC ENV
```
SYSTEM_ADDRESS='http://localhost'
MONGO_URI='mongodb://localhost:27017/vendas'
REDIS_URL='redis://127.0.0.1:6379'
PORT=3000
MONGO_DATABASE=vendas
MAIL_API_KEY=123
PW_DEFAULT=123
JWT_PW_DEFAULT=321
JWT_EXPIRE_DEFAULT=2h
EMAIL_INTERNAL=dev@dev
```

