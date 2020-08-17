# Outsmart Digital's Frontend Chat App Challenge

![Alt Text](./tenor.gif)

Esse desafio propõe a implementação frontend de uma tela para uma sala de bate-papo 
com múltiplos usuários. O objetivo desse projeto é avaliar a capacidade do desenvolvedor de 
programar uma tela com integrações de API em determinadas tecnologias.

### Instruções
#### 1. Sobre a tela
Você deve desenvolver uma única tela que será responsável por enviar as mensagens de usuário
bem como exibir as mensagens enviadas pelos outros usuários. Um usuário deverá ser capaz de abrir
sua aplicação web, digitar seu nome de usuário e a partir disso o usuário deve poder enviar mensagens
de texto somente. Sua tela deve conter, idealmente:
- Uma caixa de dilálogo onde todas as mensagens enviadas por qualquer usuário são exibidas em ordem cronológica. As mensagens mais novas devem aparecer embaixo.
- Uma caixa de texto para que o usuário insira a mensagem que quer enviar

#### 2. Sobre a integração

Nesse reposiório existe um código para servidor `WebSocket` que você poderá rodar locamente
em sua máquina para desenvolver a tela. 
A classe WebSocket está disponível na maioria dos navegadores. Para sua implementação basicamente você
precisará abrir uma conexão, receber mensagens e mandar mensagens. Para mais informações verifique a
[documentação da API](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSocket) e [confira exemplos](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications).

Para abrir o servidor localmente, você precisará ter em sua
máquina uma versão de NodeJs 8.16 ou maior, sendo que ela não foi testada com versões menores que essa.
Para rodar o servidor localmente, copie o código contido no arquivo `server.js` deste repositório
 para a sua máquina e rode o seguinte comando
em uma janela de terminal, no mesmo diretório em que `server.js` está localizado:
```
node server.js
```
Se deu tudo certo uma mensagem desse tipo aparecerá em seu terminal
```
Mon Aug 17 2020 16:10:07 GMT-0300 (-03) Server is listening on port 1337
```

Observação: as mensagens são persistidas em memória no servidor. Para resetar seu histórico de 
mensagens basta parar o processo node do servidor e iniciá-lo novamente.

#### 2.1. Enviando mensagens
As mensagens enviadas deverão ser simplesmente a string contendo o texto da mensagem do usuário a
ser enviada.
Por exemplo: `Olá`, `Como vai?`

#### 2.2. Recebendo mensagens
Existem dois tipos de mensagem que seu client poderá receber. Do type `message` e do type `history`.
Um objeto de mensagem carrega a data da mensagem: `time`, o corpo da mensagem: `text`, o nome do autor da mensagem:
`author` e a cor associada a ele: `color`.

1. Mensagens com `"type": "message"` chegarão sempre que qualquer usuário mandar uma mensagem. 
Sua aplicação deve ouvi-las a todo momento e adicioná-las a lista de mensagens 
para que possam ser visualizadas em tempo real.
```json
{
  "type":"message", 
  "data": { 
    "time": 1597688113082, 
    "text": "hello", 
    "author": "Ulfric", 
    "color": "blue"
  }
}
```

2. Uma Mensagem com `"type": "history"` chegará apenas uma vez para o seu client no momento em 
que a conexão for estabelecida. Essa mensagem carrega todas as mensagens que 
foram mandadas no chat antes de você se conectar. Sua aplicação deverá exibí-las imediatamente assim
que o usuário fornecer seu nome para participar do chat.
```json
{
  "type": "history", 
  "data": [
    { 
      "time": 1597688113082, 
      "text": "hello", 
      "author": "Ulfric", 
      "color": "blue"
    }
  ] 
}
``` 

### O que será avaliado
- Capacidade do desenvolvedor de fazer uma interface web utilizando os frameworks/ferramentas dados.
- Capacidade do desenvolvedor de criar um web client de websocket e integrá-lo em sua interface.
- Preocupação com a qualidade do código desenvolvido
- Preocupação com a performance de sua aplicação
- Funcionamento da tela de chat: o avaliador deve ser capaz de rodar sua aplicação e se comunicar no chat a partir de duas janelas diferentes

#### Considerações extras
O desenvolvimento das funcionalidades listadas a seguir não são essenciais para o funcionamento básico
da aplicação, mas podem ser consideradas
- A aplicação carrega o histórico do chat ao ser aberta.
- Capricho na estética é valioso, mas mostre suas noções de usabilidade e experiência de usuário 
- A mensagem do chat carrega uma propriedade `color`. Utilize-a para mostrar o nome dos usuários.
- manter o scroll sempre para baixo: não importa quantas mensagens
já foram carregadas no chat anteriormente, uma nova mensagem sempre deve ser visível. 
- lembre-se que em um chat web é comum o usuário submeter a mensagem apertando `Enter`, além de existir
um botão para essa ação

## Não tenha medo de inovar!
Fique a vontade para inovar em sua solução. Simplesmente pedimos que em sua resposta seja explicada 
a motivação de decisões caso sua solução seja muito inusitada. 

