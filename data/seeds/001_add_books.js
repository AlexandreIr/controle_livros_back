/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex("books").del()
    .then(function(){
      return knex("books").insert([
        {
          Titulo:"O Senhor dos Aneis: A sociedade do anel", Autor: "J.R.R. Tolkien",
          Ano: 2019, Preco: 45.15, Foto: "https://down-br.img.susercontent.com/file/42f5dca57b308748e5ae84d4b5a5397f"
        },
        {
          Titulo:"O Senhor dos Aneis: As duas torres", Autor: "J.R.R. Tolkien",
          Ano: 2019, Preco: 40.99, Foto: "https://m.media-amazon.com/images/I/61lW1iKenkL._SY445_SX342_.jpg"
        },
        {
          Titulo:"O Senhor dos Aneis: O retorno do rei", Autor: "J.R.R. Tolkien",
          Ano: 2020, Preco: 45.15, Foto: "https://images-americanas.b2w.io/produtos/01/00/img/5202803/6/5202803653_1GG.jpg"
        }
      ])
    })
};
