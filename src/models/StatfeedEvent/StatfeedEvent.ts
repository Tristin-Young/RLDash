export interface StatfeedEvent {

    event_name: string;
    main_target: {
        id: string;
        name: string;
        team_num: number;
    }
    secondary_target: {
        id: string;
        name: string;
        team_num: number;
    }
    type: string;
}