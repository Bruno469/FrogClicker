from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('keywords.txt', 'r') as f:
    _keywordsTemp = f.read().split()
    _keywords = {_keywordsTemp[i]: _keywordsTemp[i + 1] for i in range(0, len(_keywordsTemp), 2)}

@app.route('/chat', methods=['GET'])
def getChat():
    _keywordsANSWER = []
    _keywordsANSWERworlds = {}
    _pointsANSWER = 0
    userInput = request.args.get('texto').lower()
    userInput = userInput.replace(" ", "_")
    ui = userInput.split("_")

    # Adicionar todas as perguntas cadastradas à lista
    _keywordsANSWER = [key.replace("_", " ").split() for key in _keywords]

    # Processar cada pergunta cadastrada
    for idx, answerWords in enumerate(_keywordsANSWER):
        conjunto1 = set(answerWords)
        conjunto2 = set(ui)
        commonWords = conjunto1 & conjunto2
        _pointsANSWER = len(commonWords)

        # Associar pontuação à resposta correspondente
        resposta_associada = list(_keywords.values())[idx]
        if _pointsANSWER > 0:  # Apenas adiciona se houver pontos
            _keywordsANSWERworlds[_pointsANSWER] = resposta_associada.replace("_", " ")

    # Verificar a melhor resposta com a maior pontuação
    if _keywordsANSWERworlds:
        max_points = max(_keywordsANSWERworlds.keys())
        print(_keywordsANSWERworlds[max_points])
        return jsonify({'responser': _keywordsANSWERworlds[max_points]})

    else:
        print("Desculpe, não entendi sua pergunta.")
        return jsonify({'responser': "Desculpe, não entendi sua pergunta."})

    # Limpar para a próxima interação
    _keywordsANSWERworlds.clear()

if __name__ == '__main__':
    app.run(debug=True)