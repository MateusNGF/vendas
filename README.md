
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
How to run project using docker ? In root director, run ```npm run docker-deploy``` . That command build the project to js and image to docker, then trigger the command to compose all depency from project, run start:docker. Finally, Access endpoint using : http://localhost:8080, with port 8080. 

# USING DEVELOPER
 For using project how to developer, need compose depency of project using docker, necessaring the Reddis,database in memory, and MongoDB, disk in database, only. 
 Then, run command ```rpm run start:dev```. Finaly, access endpoint using http://localhost:3000, with port 3000.

---

