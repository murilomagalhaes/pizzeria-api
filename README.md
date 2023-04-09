
# 🍕 Pizzeria API

Atividade da Unidade 04 (Back-end Development) do curso de Especialização em Desenvolvimento WEB Full Stack da Unileya/iTalents.

O projeto consiste em uma API projetada para um sistema de pizzaria, onde é possível registrar usuários/clientes, pizzas e pedidos.

O projeto segue o padrão MVC, possúi autenticação via JWT e utiliza o Mongoose como banco de dados.

A documentação da API foi feita utilizando Swagger e OpenAPI 3.0, e  pode ser acessada pela rota ``/docs/api``

<hr/>


**Instruções**
- Clone o projeto
- ``npm install``
- ``npm seed:pizzas``
- ``npm seed:admin``
- Utilize a rota ``/login`` para autenticar-se e utilize o token no Authentication Header para acessar os demais endpoints. 

**Usuário Admin**
```
{    
    "email": "admin@admin.com",
    "password": "admin"
}
```

**Demonstração**: https://www.youtube.com/watch?v=FoTPIoHss30