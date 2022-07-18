import requests, random, string
import json

BASE_URL = "http://localhost:8000"

def generate_random_username():
    return ''.join(random.choice(string.ascii_letters) for i in range(10))

def post_user():
    username = generate_random_username()
    password = "8888"
    email = username + "@itba.edu.ar"
    payload = {
        "username": username,
        "password": password,
        "email": email
    }
    response = requests.post(BASE_URL + "/users", json=payload)
    return username

def post_token(username, password):
    payload = {
        "username": username,
        "password": password
    }
    response = requests.post(BASE_URL + "/token", data=payload)
    return response.json()["access_token"]

def generate_random_short_url():
    return ''.join(random.choice(string.ascii_letters) for i in range(7))

def generate_random_title():
    return ''.join(random.choice(string.ascii_letters) for i in range(10))

def post_link(token, target_url, short_url, title):
    payload = {
        "target_url": target_url,
        "short_url": short_url,
        "title": title
    }
    headers = {
        "Authorization": "Bearer " + token
    }
    response = requests.post(BASE_URL + "/links", json=payload, headers=headers)
    return response.json()


for i in range(100):
    username = post_user()
    token = post_token(username, "8888")
    target_url = "http://www.google.com"
    for i in range(500):
        short_url = generate_random_short_url()
        title = generate_random_title()
        post_link(token, target_url, short_url, title)
        print(i, short_url)
