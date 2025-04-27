from chatterbot import ChatBot
from Custom_English import ENG_1
# from chatterbot.trainers import ListTrainer , ChatterBotCorpusTrainer
# from chatterbot.languages import ENG
# from chatterbot.trainers import ListTrainer
# from chatterbot.trainers import  ChatterBotCorpusTrainer
# from chatterbot.languages import ENG
# from cleaner import clean_corpus , clean_corpus_whatsapp

# class ENG_1:
#     ISO_639_1 = 'en_core_web_sm'
#     ISO_639 = 'en_core_web_sm'
#     ENGLISH_NAME = 'English'


bot = ChatBot(
    "aman" ,
    tagger_language=ENG_1,
    logic_adapters=[
        #   all logical adapter
        # {   'chatterbot.logic.MathematicalEvaluation',
        #     'chatterbot.logic.TimeLogicAdapter',
        #     # 'chatterbot.logic.BestMatch'
        #     # 'chatterbot.logic.SpecificResponseAdapter'
        # },
        {   #   for low confidence response
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'I am sorry, but I do not understand. please elaborate',
            'maximum_similarity_threshold': 0.80
            #   for setting up comparision and responce selection
            # "statement_comparison_function": chatterbot.comparisons.LevenshteinDistance,
            # "response_selection_method": chatterbot.response_selection.get_first_response    
        },
    
        {   #   for specific responce
            'import_path': 'chatterbot.logic.SpecificResponseAdapter',
            'input_text': 'Help me!',
            'output_text': 'Ok, here is a link: http://chatterbot.rtfd.org'
        },
    ], 
    #       #   appling filters
    # filters=[filters.get_recent_repeated_responses]
    
    # preprocessors=['chatterbot.preprocessors.clean_whitespace']
)





#  Spacy ERROR
# -----------------------------------------------------------------------------
# adding language for compatibility with spacy 3.0
# class ENG:
#     ISO_639_1 = 'en_core_web_sm'
#     ISO_639 = 'eng'
#     ENGLISH_NAME = 'English'
# class ENGSM:
#     ISO_639_1 = 'en_core_web_sm'

# import spacy

# # Create a custom chatbot class
# class CustomChatBot(ChatBot):
#     def __init__(self, **kwargs):
#         super().__init__(**kwargs)
#         self.tagger = self.get_tagger()

#     def get_tagger(self):
#         class CustomPosLemmaTagger(PosLemmaTagger):
#             def __init__(self):
#                 self.nlp = spacy.load('en_core_web_sm', disable=['parser', 'ner'])

#         return CustomPosLemmaTagger()