FROM python:3.10-slim 

WORKDIR /docker_directory
COPY . /docker_directory/

# Upgrade pip to the latest version
RUN pip install --upgrade pip

RUN pip install torch==2.4.1+cpu --index-url https://download.pytorch.org/whl/cpu

# Install the required libraries
RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["uvicorn", "app.api:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
