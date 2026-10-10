use axum::Router;
use sqlx::SqlitePool;
use tower_http::trace::TraceLayer;

use crate::state::AppState;

pub mod error;
pub mod routes;
pub mod state;

pub fn app(pool: SqlitePool) -> Router {
    let state = AppState::new(pool);
    routes::router()
        .layer(TraceLayer::new_for_http())
        .with_state(state)
}
