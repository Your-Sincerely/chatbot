#  importing
# -----------------------------------------------------------------------------

from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer , ChatterBotCorpusTrainer
from cleaner import clean_corpus , clean_corpus_whatsapp
from Custom_English import ENG_1
import logging
# from chatterbot.comparisons import LevenshteinDistance

# verbos
# ----------------------------------------------------------------------------

# Uncomment the following lines to enable verbose logging
logging.basicConfig(level=logging.ERROR)
# The logging levels available are (CRITICAL, ERROR, WARNING, INFO, DEBUG, and NOTSET)

# config
# ---------------------------------------------------------------------------

chatbot = ChatBot(
    "chatbot",

    # adding custom class for spacy
    tagger_language=ENG_1,

    logic_adapters=[
        #   all logical adapter
        {   #   for low confidence response
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'I am sorry, but I do not understand. please elaborate',
            'maximum_similarity_threshold': 0.10
    
            # #   for setting up comparision and responce selection
            # "statement_comparison_function": chatterbot.comparisons.LevenshteinDistance,
            # "response_selection_method": chatterbot.response_selection.get_first_response
        },
        'chatterbot.logic.MathematicalEvaluation',
        # 'chatterbot.logic.TimeLogicAdapter',
            # 'chatterbot.logic.BestMatch'
            # 'chatterbot.logic.SpecificResponseAdapter'
        
    
        {   #   for specific responce
            'import_path': 'chatterbot.logic.SpecificResponseAdapter',
            'input_text': 'Help me!',
            'output_text': 'Ok, here is a link: http://chatterbot.rtfd.org'
        }
    ],   
    #       #   appling filters
    # filters=[filters.get_recent_repeated_responses]
    
    # preprocessors=[
    #     'chatterbot.preprocessors.clean_whitespace'
    # ],
                            #       #   for connection string to mangoDB
                            #       #   storage_adapter="chatterbot.storage.MongoDatabaseAdapter"
                            #       #   database_uri='mongodb://localhost:27017/chatterbot-database'
                            # storage_adapter={
                            #       'import_path':"chatterbot.storage.MongoDatabaseAdapter",
                            #       'database_uri': 'mongodb://localhost:27017/chatterbot-database'
                            #   },
                            # 
                            #       #   for new comparision library
                            # statement_comparison_function=LevenshteinDistance
                            # 
                            # 
)
    
    
trainer_corpus = ChatterBotCorpusTrainer(chatbot)
trainer_list = ListTrainer(chatbot)
CORPUS_FILE = "dialogs.txt"
CORPUS_FILE_whatsapp = "chat.txt"

# training
# ---------------------------------------------------------------------------

def split_list(a_list):
    half = len(a_list)//2
    return a_list[:half], a_list[half:]

def cleanning_data_kaggle():
    print("-------cleaning kaggle data----------")
    B, C  = clean_corpus(CORPUS_FILE)
    return B, C

def cleanning_data_whatsapp():
    print("-------cleaning whatsapp chat----------")
    list = clean_corpus_whatsapp(CORPUS_FILE_whatsapp)
    return list



def tranning(list , list1):

    print("-------training through default corpus----------")
    trainer_corpus.train(
        "chatterbot.corpus.english"
    )

    # print("-------training through kaggle data----------")
    # trainer_list.train(list)

    # print("-------training through chat data----------")
    # trainer_list.train(list1)

#trainer.train(cleaned_corpus)
# for index, row in df.iterrows():
#     question = row['question']
#     answer = row['answer']
#     trainer.train([question, answer])

# Testing
# ----------------------------------------------------------------------------

def testing(a):
    for x in a:
        try:
            print("______________________________")
            print(f"input ---> {x}")
            print(f"output ---> {chatbot.get_response(x)}")

        # Press ctrl-c or ctrl-d on the keyboard to exit
        except (KeyboardInterrupt, EOFError, SystemExit):
            break

# printing
# -----------------------------------------------------------------------------

def chat():
    print('Type something to begin...')


    exit_conditions = (":q", "quit", "exit")
    while True:
        try:
            query = input("> ")
            if query in exit_conditions:
                break
            else:
                print(f"🪴 {chatbot.get_response(query)}")

        # Press ctrl-c or ctrl-d on the keyboard to exit
        except (KeyboardInterrupt, EOFError, SystemExit):
            break

    #     #   exporting training data
    # trainer.export_for_training('./my_export.json')

if __name__ == "__main__" :
    a,b =cleanning_data_kaggle()
    c =cleanning_data_whatsapp()
    tranning(a,c)
    # testing(b)
    # chat()