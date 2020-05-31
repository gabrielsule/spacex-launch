import {
  Component,
  OnInit
} from '@angular/core';
import {
  Apollo,
  QueryRef
} from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.css']
})
export class LaunchesComponent implements OnInit {
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

}
