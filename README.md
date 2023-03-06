
# INICIALIZANDO O PROJETO

### Alguns pontos de observação:
1. O script de injeção no mongodb não funciona, ou seja, não possi indexes criados.
2. A arquitetura do projeto pode conter gafes, mas a ideia no geral foi atingida.
3. Utilize o autocannon para fazer o test de carga.
4. Para conseguir alterar seu user para adm, segue os passos:
    1. `docker exec -it mongo_db sh` .
    2. `use vendas`.
    3. `db.authenticates.update({ associeted_user : {SEU_ID}}, { access_level  : 1 })`

---

### REQUISISTOS
 1. Node >=16.10.0
 2. Docker
 
---
### UTILIZANDO DOCKER :
Para gerar as novas imagens e construir o grupo, rode esse comando: `npm run deploy-docker` 
> http://localhost:3000
