use axum::{
    body::Body,
    http::{Request, StatusCode},
};

use listing::app;
use sqlx::SqlitePool;
use tower::ServiceExt;

#[sqlx::test]
async fn test_smoke_stubbed_endpoint_returns_501(pool: SqlitePool) {
    let app = app(pool);

    let response = app
        .oneshot(
            Request::builder()
                .uri("/accounts")
                .method("GET")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(response.status(), StatusCode::NOT_IMPLEMENTED);
}
