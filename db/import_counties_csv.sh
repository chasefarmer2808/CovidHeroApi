read_var() {
    VAR=$(grep $1 $2 | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    echo ${VAR[1]}
}

DB_USER=$(read_var DB_USER ../.env)
DB_PASSWORD=$(read_var DB_PASSWORD ../.env)

wget https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv

if [ $1 == "--local" ]
then
    mongoimport -h localhost --port 27017 -d covidhero --drop -c counties --type csv --headerline --file us-counties.csv
else
    mongoimport --uri "mongodb+srv://${DB_USER}:${DB_PASSWORD}@covidhero-b5qz6.mongodb.net/covidhero?retryWrites=true&w=majority" --drop -c counties --type csv --headerline --file us-counties.csv
fi

rm us-counties.csv