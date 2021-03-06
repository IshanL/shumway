/**
 * Copyright 2014 Mozilla Foundation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Class: Context3DBlendFactor
module Shumway.AVM2.AS.flash.display3D {
  import notImplemented = Shumway.Debug.notImplemented;
  import asCoerceString = Shumway.AVM2.Runtime.asCoerceString;
  export class Context3DBlendFactor extends ASNative {
    
    // Called whenever the class is initialized.
    static classInitializer: any = null;
    
    // Called whenever an instance of the class is initialized.
    static initializer: any = null;
    
    // List of static symbols to link.
    static classSymbols: string [] = null; // [];
    
    // List of instance symbols to link.
    static instanceSymbols: string [] = null; // [];
    
    constructor () {
      false && super();
      notImplemented("Dummy Constructor: public flash.display3D.Context3DBlendFactor");
    }
    
    // JS -> AS Bindings
    static ONE: string = "one";
    static ZERO: string = "zero";
    static SOURCE_ALPHA: string = "sourceAlpha";
    static SOURCE_COLOR: string = "sourceColor";
    static ONE_MINUS_SOURCE_ALPHA: string = "oneMinusSourceAlpha";
    static ONE_MINUS_SOURCE_COLOR: string = "oneMinusSourceColor";
    static DESTINATION_ALPHA: string = "destinationAlpha";
    static DESTINATION_COLOR: string = "destinationColor";
    static ONE_MINUS_DESTINATION_ALPHA: string = "oneMinusDestinationAlpha";
    static ONE_MINUS_DESTINATION_COLOR: string = "oneMinusDestinationColor";
    
    
    // AS -> JS Bindings
    
  }
}
