#[cfg(debug_assertions)]
pub fn init_tracing() -> tracing_appender::non_blocking::WorkerGuard {
    use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

    let file_appender = tracing_appender::rolling::never(".logs", "listing.log");
    let (file_writer, guard) = tracing_appender::non_blocking(file_appender);

    let stdout_layer = tracing_subscriber::fmt::layer().with_writer(std::io::stdout);

    let file_layer = tracing_subscriber::fmt::layer()
        .with_writer(file_writer)
        .with_ansi(false);

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "listing=debug,tower_http=debug".into()),
        )
        .with(stdout_layer)
        .with(file_layer)
        .init();

    guard
}

#[cfg(not(debug_assertions))]
pub fn init_tracing() {
    tracing_subscriber::fmt::init()
}
