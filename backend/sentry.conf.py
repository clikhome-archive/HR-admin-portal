import raven, os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

RAVEN_CONFIG = {
    'dsn': 'https://ccb5ee8e023c49088c958e3815525ff7:fbed94ab709b422d91b54cc57799e360@app.getsentry.com/70990',
    'release': raven.fetch_git_sha(BASE_DIR),
}