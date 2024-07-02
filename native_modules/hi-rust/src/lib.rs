#[macro_use]
extern crate napi_derive;

use napi::{CallContext, Error, JsNumber, JsObject, JsUnknown, JsString, Result, Status};
use std::convert::TryInto;

#[module_exports]
fn init(mut exports: JsObject) -> Result<()> {
  exports.create_named_method("testThrow", test_throw)?;
  exports.create_named_method("fibonacci", fibonacci)?;
  exports.create_named_method("read_file", read_file)?;

  Ok(())
}

#[js_function]
fn test_throw(_ctx: CallContext) -> Result<JsUnknown> {
  Err(Error::from_status(Status::GenericFailure))
}

#[js_function(1)]
fn fibonacci(ctx: CallContext) -> Result<JsNumber> {
  let n = ctx.get::<JsNumber>(0)?.try_into()?;
  ctx.env.create_int64(fibonacci_native(n))
}

#[inline]
fn fibonacci_native(n: i64) -> i64 {
  match n {
    1 | 2 => 1,
    _ => fibonacci_native(n - 1) + fibonacci_native(n - 2),
  }
}

#[js_function(1)]
fn read_file(ctx: CallContext) -> Result<JsString> {
    let file_path = ctx.get::<JsString>(0)?.into_utf8()?;
    let file_content = std::fs::read_to_string(file_path.as_str()?)?;

    ctx.env.create_string(&file_content)
}
