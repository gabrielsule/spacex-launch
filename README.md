# SpacexLaunch

### Inicialización del proyecto
```bash
ng new spacex-launch
```

### Instalación de Apollo
```bash
cd spacex-launch

ng add apollo-angular
```

### Generación de componente
```bash
ng g c launches --module app
```

### Agregado de URL de Space X
Modificamos el archivo **graphql.module.ts** situado en la carpeta **src/app/**

```javascript
const uri = 'https://api.spacex.land/graphql/'; // <-- add the URL of the GraphQL server here
```

### Consumiendo datos
Ahora bien creamos la conexión con la API
> launches.component.ts

```javascript
import {
  Apollo,
  QueryRef
} from 'apollo-angular';
import gql from 'graphql-tag';

  launchQuery = gql `
  query {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        first_stage {
          cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
            payload_mass_lbs
          }
        }
      }
    }
  }
  `;

  launches: any[] = [];
  query: QueryRef < any > ;

  constructor(
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.queryResult();
  }

  queryResult() {
    this.query = this.apollo.watchQuery({
      query: this.launchQuery,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.launches = result.data.launchesPast;
    });
  }
```

> launches.component.html
```html
<div class="container">

  <div class="jumbotron">
    <h1 class="display-4">Space X - Lanunches</h1>
  </div>


  <div class="row">
    <div class="col-sm-6">

      <div *ngFor="let item of launches">

        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{item.mission_name}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{item.launch_date_local | date}}</h6>
            <p class="card-text">{{item.rocket.second_stage.payloads[0].payload_type}}</p>
            <p class="card-text">{{item.launch_site.site_name_long}}</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>
```

### Probando el proyecto
```bash
ng serve -o
```





