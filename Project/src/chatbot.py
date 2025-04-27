from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer , ChatterBotCorpusTrainer
from cleaner import clean_corpus , clean_corpus_whatsapp
from Custom_English import ENG_1

chatbot = ChatBot(
    "chatbot",
    
    tagger_language=ENG_1,

    storage_adapter={
        'import_path':"chatterbot.storage.MongoDatabaseAdapter",
        'database_uri': 'mongodb://localhost:27017/chatterbot-database'
    },
    
    preprocessors=[
        'chatterbot.preprocessors.clean_whitespace'
    ],

    logic_adapters=[
        
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'I am sorry, but I do not understand. please elaborate',
            'maximum_similarity_threshold': 0.10
        },
        'chatterbot.logic.MathematicalEvaluation',
        
    
        {   #   for specific responce
            'import_path': 'chatterbot.logic.SpecificResponseAdapter',
            'input_text': 'Help me!',
            'output_text': 'Ok, here is a link: http://chatterbot.rtfd.org'
        }
    ],
)

trainer_corpus = ChatterBotCorpusTrainer(chatbot)
trainer_list = ListTrainer(chatbot)
CORPUS_FILE = "dialogs.txt"
CORPUS_FILE_whatsapp = "chat.txt"

# B, C  = clean_corpus(CORPUS_FILE)
# list = clean_corpus_whatsapp(CORPUS_FILE_whatsapp)
# A = B + list

# trainer_list.train(A)

# trainer_corpus.train(
#     "chatterbot.corpus.english"
# )