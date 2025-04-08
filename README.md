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

### Build Frontend
In a bash shell, input:
```bash
cd frontend
npm install
npm run build
```
**NOTE:** You only need to do "npm install" on your first demo

Everytime you make changes to the frontend, input
```bash
npm run build
```

This way it rebuilds the app with the changes you have made

