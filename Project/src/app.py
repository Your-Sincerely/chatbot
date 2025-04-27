from flask import Flask, render_template, jsonify, request
from flask_pymongo import PyMongo
from chatbot import chatbot

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/chatterbot-database"
mongo = PyMongo(app)

@app.route("/")
def home():
    chats = mongo.db.chats.find({})
    titles = mongo.db.chats.find({"value": "title"})
    myChats = [chat for chat in chats]
    myChatsTitles = [chat for chat in titles]

    print(myChats)
    print(myChatsTitles)
    return render_template("index.html", myChats = myChats , myChatsTitles = myChatsTitles)

@app.route("/newChat")
def CHATS():
    chats = mongo.db.chats.find({})
    titles = mongo.db.chats.find({"value": "title"})
    myChats = [chat for chat in chats]
    myChatsTitles = [chat for chat in titles]

    print(myChats)
    print(myChatsTitles)
    return render_template("newChat.html", myChats = myChats , myChatsTitles = myChatsTitles)


@app.route("/api", methods=["GET", "POST"])
def qa():
    if request.method == "POST":
        print(request.json)
        question = request.json.get("question")
        value = request.json.get("value")
        parantID = request.json.get("parent")
        print(question)

        # chat = mongo.db.chats.find_one({"question": question})
        chat = mongo.db.chats.find_one({"question": question})
        print(chat)


        if chat:
            data = {"question": question, "answer": f"{chat['answer']}" , "value": value , "parent": parantID}
            return jsonify(data)
        else:
            
            response = str(chatbot.get_response(question))
            print(response)

            data = {"question": question, "answer": response}
            print(data)

            mongo.db.chats.insert_one({"question": question, "answer": response , "value": value , "parent": parantID})
            return jsonify(data)
        
    data = {"result": "Thank you! I'm just a machine learning model designed to respond to questions and generate text based on my training data. Is there anything specific you'd like to ask or discuss? "}
        
    return jsonify(data)

app.run(debug=True, port=5001)