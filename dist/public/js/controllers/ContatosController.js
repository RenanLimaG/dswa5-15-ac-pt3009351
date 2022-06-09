angular.module('ifsp').controller('ContatosController',
    ["Contato", "$scope", function(Contato, $scope) {
        $scope.contatos = [];
        $scope.filtro = '';
        $scope.mensagem = { texto: '' };

        function buscaContatos() {
            Contato.query(
                function(contatos) {
                    $scope.contatos = contatos;
                    $scope.mensagem = {};
                },
                function(erro) {
                    console.log("Não foi possível obter a lista de contatos");
                    console.log(erro);
                    $scope.mensagem = { texto: "Não foi possível obter a lista de contatos" };
                }
            );
        }
        buscaContatos();
        $scope.remove = function(contato) {
            console.log(contato);
            Contato.delete({ id: contato._id },
                buscaContatos,
                function(erro) {
                    console.log("Não foi possível remover o contato");
                    console.log(erro);
                    $scope.mensagem = { texto: "Não foi possível remover o contato" };
                });
        };
    }]);