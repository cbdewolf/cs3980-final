# cs3980-final

## How to Demo

### Create Virtual Environment and Install Dependencies

For Windows:

```powershell
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

For macOS:

```zsh
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### How to Launch App

In a bash shell, input:

```bash
cd frontend
npm install
```

**NOTE:** You only need to do "npm install" on your first demo

If you are only changing frontend, use

```bash
npm run dev
```

This will show live changes to the React code, but will not be synced with the backend

If you are demoing both the frontend and backend

Everytime you make changes to the frontend, input

```powershell
uvicorn backend.main:app --reload
```

To launch FastAPI, then create a bash terminal, and do

```bash
cd frontend
npm run build
```

This way it rebuilds the app with the changes you have made

You will have to resubmit

```bash
npm run build
```

To view any changes to the frontend you make, so I suggest only using this if you are testing any backend functionality.
