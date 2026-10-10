use axum::{
    Router,
    http::StatusCode,
    routing::{get, patch, post},
};

use crate::error::AppError;
use crate::state::AppState;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/accounts", post(post_accounts).get(get_accounts))
        .route("/listings", post(post_listings).get(get_listings))
        .route("/listings/{id}", get(get_listing).delete(delete_listing))
        .route("/listings/{id}/status", patch(patch_listing_status))
}

async fn post_accounts() -> Result<StatusCode, AppError> {
    Ok(StatusCode::NOT_IMPLEMENTED)
}

async fn get_accounts() -> Result<StatusCode, AppError> {
    Ok(StatusCode::NOT_IMPLEMENTED)
}

async fn post_listings() -> Result<StatusCode, AppError> {
    Ok(StatusCode::NOT_IMPLEMENTED)
}

async fn get_listings() -> Result<StatusCode, AppError> {
    Ok(StatusCode::NOT_IMPLEMENTED)
}

async fn get_listing() -> Result<StatusCode, AppError> {
    Ok(StatusCode::NOT_IMPLEMENTED)
}

async fn delete_listing() -> Result<StatusCode, AppError> {
    Ok(StatusCode::NOT_IMPLEMENTED)
}

async fn patch_listing_status() -> Result<StatusCode, AppError> {
    Ok(StatusCode::NOT_IMPLEMENTED)
}
