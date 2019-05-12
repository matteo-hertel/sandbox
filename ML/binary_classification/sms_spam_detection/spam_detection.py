import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense, Embedding, GlobalAveragePooling1D
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model
import pickle
import pandas as pd

TRAIN = False

if TRAIN:
    tokenizer = Tokenizer(num_words=5000)
    df = pd.read_csv('data.tsv', names=['label', 'text'], sep='\t')

    sentences = df['text'].values
    labels = df['label'].values

    sentences_train, sentences_test,\
        train_labels, test_labels = train_test_split(
            sentences, labels, test_size=0.20)

    tokenizer.fit_on_texts(sentences_train)
    train_data = tokenizer.texts_to_sequences(sentences_train)
    test_data = tokenizer.texts_to_sequences(sentences_test)
    vocab_size = len(tokenizer.word_index) + 1

    train_data = pad_sequences(train_data, padding='post', maxlen=100)
    test_data = pad_sequences(test_data, padding='post', maxlen=100)

    vocab_size = 10000

    model = Sequential()
    model.add(Embedding(vocab_size, 16))
    model.add(GlobalAveragePooling1D())
    model.add(Dense(16, activation='relu'))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(128, activation='relu'))
    model.add(Dense(256, activation='relu'))
    model.add(Dense(128, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(16, activation='relu'))
    model.add(Dense(1, activation='sigmoid'))

    model.summary()

    model.compile(optimizer='adam',
                  loss='binary_crossentropy',
                  metrics=['acc'])

    history = model.fit(train_data,
                        train_labels,
                        epochs=30,
                        batch_size=120,
                        validation_data=(test_data, test_labels),
                        verbose=1)

    history_dict = history.history

    acc = history_dict['acc']
    val_acc = history_dict['val_acc']
    loss = history_dict['loss']
    val_loss = history_dict['val_loss']
    epochs = range(1, len(acc) + 1)

    # "bo" is for "blue dot"
    plt.plot(epochs, loss, 'bo', label='Training loss')
    # b is for "solid blue line"
    plt.plot(epochs, val_loss, 'b', label='Validation loss')
    plt.title('Training and validation loss')
    plt.xlabel('Epochs')
    plt.ylabel('Loss')
    plt.legend()

    plt.show()
    plt.clf()   # clear figure

    plt.plot(epochs, acc, 'bo', label='Training acc')
    plt.plot(epochs, val_acc, 'b', label='Validation acc')
    plt.title('Training and validation accuracy')
    plt.xlabel('Epochs')
    plt.ylabel('Accuracy')
    plt.legend()

    plt.show()
    model.save('spam_detector.h5')
    with open('tokenizer.pickle', 'wb') as handle:
        pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
else:
    model = load_model('spam_detector.h5')
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

x_predict = [
    'Hey mate, how are you? Are we watching Game Of thrones tomorrow?',
    'Is mum coming home earlier tonight?',
    'How about pizza tonight?',
    'Call us 080034488 and save £500 off your next order',
    'Congratulation, you won a £300, text STOP to opt out',
    'You\'ve been choosen to win a fantastic prize',
    'Send LOL to 43244 to receive a surprise, this is a limited time offer',
    'We tried to reach you for a new fantastic opportunity as a Java developer',
    'YOU ARE THE WINNER OF A BRAND NEW iPhone, contact us to now'
]
predict_data = tokenizer.texts_to_sequences(x_predict)

x_predict = pad_sequences(predict_data, padding='post', maxlen=100)
output = model.predict_classes(x_predict)

print(output)
# exit()
