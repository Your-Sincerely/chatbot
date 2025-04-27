import numpy as np 
import pandas as pd
import unicodedata
import json 
import string
import os
import re


def clean_corpus_whatsapp(chat_export_file = 'chat.txt'):
   path = os.getcwd()+'/'+chat_export_file
   """Prepare a WhatsApp chat export for training with chatterbot."""
   message_corpus = remove_chat_metadata(path)
   cleaned_corpus = remove_non_message_text(message_corpus)
   return list(cleaned_corpus)


def remove_chat_metadata(chat_export_file):
   """Remove WhatsApp chat metadata.

   WhatsApp chat exports come with metadata about each message:

    date    time    username  message
   ---------------------------------------
   8/26/22, 17:47 - Jane Doe: Message text

   This function removes all the metadata up to the text of each message.

   Args:
       chat_export_file (str): The name of the chat export file

   Returns:
       tuple: The text of each message in the conversation
   """
   date_time = r"(\d+\/\d+\/\d+,\s\d+:\d+)"  # e.g. "8/26/22, 17:47"
   dash_whitespace = r"\s-\s"  # " - "
   username = r"([\w\s]+)"  # e.g. "Jane Doe"
   metadata_end = r":\s"  # ": "
   pattern = date_time + dash_whitespace + username + metadata_end

   with open(chat_export_file,  "r" ,encoding="utf8") as corpus_file:
       content = corpus_file.read()
   cleaned_corpus = re.sub(pattern, "", content)
   return tuple(cleaned_corpus.split("\n"))


def remove_non_message_text(export_text_lines):
   """Remove conversation-irrelevant text from chat export.

   WhatsApp chat exports come with a standardized intro line,
   and an empty line at the end of the file.
   Text exports also replace media messages with text that isn't
   relevant for the conversation. This function removes all that.

   Args:
       export_text_lines (tuple): All lines from the export file

   Returns:
       tuple: Messages that are a relevant part of the conversation
   """
   messages = export_text_lines[1:-1]

   filter_out_msgs = ("<Media omitted>",)
   return tuple((msg for msg in messages if msg not in filter_out_msgs))

#import matplotlib.pyplot as plt
#import tensorflow as tf
#import keras 
#from keras.layers import Dense
#from sklearn.feature_extraction.text import TfidfVectorizer
#from sklearn.model_selection import train_test_split


def clean_corpus(chat_export_file = 'dialogs.txt'):
    path = os.getcwd()+'/'+chat_export_file
    data=pd.read_csv(path,sep='\t',names=['question','answer'])
    data["question"] = data["question"].apply(clean_text)
    data["answer"] = data["answer"].apply(clean_text)
    questions  = data["question"].values.tolist()
    answers =  data["answer"].values.tolist()

    return questions , answers
    # sentences = []

    # with open(path, 'r') as file:
    #     for line in file:
    #         line = line.strip()  # Remove leading/trailing whitespaces
    #         if '\t' in line:
    #             sentence1, sentence2 = line.split('\t')
    #             sentences.append(sentence1.strip())
    #             # sentences.append(sentence2.strip())

    # return tuple(sentences)

    # return data


def unicode_to_ascii(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s)
      if unicodedata.category(c) != 'Mn')

def clean_text(text):
    text = unicode_to_ascii(text.lower().strip())
    text = re.sub(r"i'm", "i am", text)
    text = re.sub(r"\r", "", text)
    text = re.sub(r"he's", "he is", text)
    text = re.sub(r"she's", "she is", text)
    text = re.sub(r"it's", "it is", text)
    text = re.sub(r"that's", "that is", text)
    text = re.sub(r"what's", "that is", text)
    text = re.sub(r"where's", "where is", text)
    text = re.sub(r"how's", "how is", text)
    text = re.sub(r"\'ll", " will", text)
    text = re.sub(r"\'ve", " have", text)
    text = re.sub(r"\'re", " are", text)
    text = re.sub(r"\'d", " would", text)
    text = re.sub(r"\'re", " are", text)
    text = re.sub(r"won't", "will not", text)
    text = re.sub(r"can't", "cannot", text)
    text = re.sub(r"n't", " not", text)
    text = re.sub(r"n'", "ng", text)
    text = re.sub(r"'bout", "about", text)
    text = re.sub(r"'til", "until", text)
    text = re.sub(r"[-()\"#/@;:<>{}`+=~|.!?,]", "", text)
    text = text.translate(str.maketrans('', '', string.punctuation)) 
    text = re.sub("(\\W)"," ",text) 
    text = re.sub('\S*\d\S*\s*','', text)
    return text

# if __name__ == "__main__" :
#     list = clean_corpus()
#     list1 = clean_corpus_whatsapp()

#     print(list[:5])
#     print("----------------------------")
#     print(list1[:5])