FROM python:3.7.17-slim

WORKDIR /chatterbot

COPY requirements.txt requirements.txt
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt
RUN python3 -m spacy download en_core_web_sm
# RUN python -m nltk.downloader popular

EXPOSE 5000

COPY ./src ./src

CMD ["python3", "./src/app.py"]